import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { generateJobDescription } from "@/lib/ai";

// Validation schemas
const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  level: z.enum(["junior", "mid", "senior", "staff", "principal"]).optional(),
  department: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  location_type: z.enum(["remote", "onsite", "hybrid"]).optional(),
  employment_type: z
    .enum(["full-time", "part-time", "contract", "internship"])
    .optional(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  required_skills: z.array(z.string()).min(1, "At least one skill required"),
  nice_to_have_skills: z.array(z.string()).optional().default([]),
  salary_min: z.number().positive().optional(),
  salary_max: z.number().positive().optional(),
  use_ai_description: z.boolean().optional().default(false),
});

const listJobsSchema = z.object({
  status: z.enum(["draft", "active", "paused", "closed"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sort: z.enum(["created_at", "updated_at", "title"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

/**
 * GET /api/jobs
 * List all jobs for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    // Parse and validate query parameters
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const validation = listJobsSchema.safeParse(searchParams);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { status, page, limit, sort, order } = validation.data;
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("created_by", user.id)
      .order(sort, { ascending: order === "asc" })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq("status", status);
    }

    const { data: jobs, error: dbError, count } = await query;

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to fetch jobs", code: "DB_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      jobs,
      pagination: {
        total: count ?? 0,
        page,
        limit,
        pages: Math.ceil((count ?? 0) / limit),
      },
    });
  } catch (error) {
    console.error("Unexpected error in GET /api/jobs:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/jobs
 * Create a new job posting
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = createJobSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const jobData = validation.data;
    let description = jobData.description;

    // Generate AI description if requested
    if (jobData.use_ai_description) {
      try {
        description = await generateJobDescription({
          title: jobData.title,
          level: jobData.level,
          required_skills: jobData.required_skills,
          base_description: jobData.description,
          department: jobData.department,
          location: jobData.location,
        });
      } catch (aiError) {
        console.error("AI description generation failed:", aiError);
        // Fall back to original description
      }
    }

    // Insert job
    const { data: job, error: insertError } = await supabase
      .from("jobs")
      .insert({
        created_by: user.id,
        title: jobData.title,
        level: jobData.level,
        department: jobData.department,
        location: jobData.location,
        location_type: jobData.location_type,
        employment_type: jobData.employment_type,
        description,
        required_skills: jobData.required_skills,
        nice_to_have_skills: jobData.nice_to_have_skills,
        salary_min: jobData.salary_min,
        salary_max: jobData.salary_max,
        ai_generated_description: jobData.use_ai_description,
        status: "draft",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create job", code: "INSERT_FAILED" },
        { status: 500 }
      );
    }

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in POST /api/jobs:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
