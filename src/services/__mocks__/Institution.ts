export const mockInstitution = {
  id: "f1f34235-bcaf-4429-8d4f-646b961d0d80",
  slug: "centralbankonline",
  name: "Central Bank",
  domain: "centralbankonline.com",
  templateApprove:
    "Welcome, {name}!\n\nWe`re happy to inform you that your new {product} account is active with the following information:\n\nRouting Number: {routingNumber}\nAccount Number: {accountNumber}\n\nPlease deposit at least ${amount} into your account within the next 5 days to finalize the setup.\n\n(Information regarding your debit card, Online and Mobile Banking, and will be provided later today.)\n\nThank you,\n{employee} \n{bankName}\n{domain}",
  templateDecline:
    "Dear {name},\n\nDue to invalid documents, we cannot open your {product} account at this time.\n\nPlease contact your nearest Central Bank office ({domain}) for assistance, or create a new account request using valid documents at https://dev.nimblefi.com/{domain}/onboarding\n\nThank you,\n{employee}\n{bankName}\n{domain}",
  routingNumber: "073903503",
  logoUri: {
    default:
      "https://nimble-assets-dev.s3.us-east-2.amazonaws.com/logo/76ea47f7-0335-4f21-b8a4-6f6ec01ee767.png",
  },
  backgroundImageUri: {
    default:
      "https://nimble-assets-dev.s3.us-east-2.amazonaws.com/background/46245139-d5fb-4767-8a26-049bb8437a54.png",
  },
};

export const invalidResponse = {
  statusCode: 401,
  message: "Request failed with status code 401",
};
