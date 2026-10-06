import { DEMO_EMAIL, DEMO_PASSWORD } from "../lib/constants";
import { prisma } from "../lib/db";
import { auth } from "../lib/auth";
import { seedDemoWorkspace } from "../lib/provision";

async function main() {
  const email = DEMO_EMAIL;
  const password = DEMO_PASSWORD;

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: "Demo Marketer",
      },
    });
    user = await prisma.user.findUnique({ where: { email } });
  }

  if (!user) {
    throw new Error("Failed to create demo user");
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { organization: { include: { workspaces: true } } },
  });

  let workspace = membership?.organization.workspaces[0];
  if (workspace && !workspace.isDemo) {
    workspace = await prisma.workspace.update({
      where: { id: workspace.id },
      data: { isDemo: true, onboardingCompleted: true, name: "Demo Workspace" },
    });
  }

  if (workspace && membership) {
    await seedDemoWorkspace(workspace.id, user.id, membership.organizationId);
  }

  console.log("Demo user ready:", email, "/", password);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
