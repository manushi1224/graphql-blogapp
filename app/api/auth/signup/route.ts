import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { GetUserByEmail } from "@/services";
import { publishAuthor } from "@/app/lib/publishControllers";
import { CreateNextUserMutation } from "@/app/graphql/mutation";
import client from "@/app/lib/client";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, bio, name }: any = await req.json();
  if (!email || !password || !name || !bio) {
    return NextResponse.json({
      message: "Please fill all the fields",
      success: false,
    });
  }

  const exixstingUser = await GetUserByEmail(email);
  if (exixstingUser.user?.email === email) {
    return NextResponse.json({
      message: "Account Already Exists!",
      status: 400,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const userData = {
    email,
    password: hashedPassword,
    name,
    bio,
  };

  try {
    const response: any = await client.request(CreateNextUserMutation, {
      userData,
    });
    await publishAuthor(response.createAuthor.id);
    return NextResponse.json({
      message: "User Created Successfully!",
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
