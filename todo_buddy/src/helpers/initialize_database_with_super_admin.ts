import { PostgresDataSource } from "../config/data-source";
import { User } from "../models/user";
import { UserRole } from "../models/user";
import * as bcrypt from 'bcrypt';

const adminRepo = PostgresDataSource.getRepository(User);

export async function initializeDatabaseWithSuperAdmin() {
  const adminEmail = "shreyash.gaikwad@mindbowser.com";

  const existingAdmin = await adminRepo.findOneBy({ email: adminEmail });
  if (existingAdmin) {
    console.log("Super admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("12345678", 10);

  const adminUser = adminRepo.create({
    name: "shreyash",
    email: adminEmail,
    password_hash: hashedPassword,
    role: UserRole.ADMIN,
  });

  await adminRepo.save(adminUser);
  console.log("Super admin created successfully.");
}

