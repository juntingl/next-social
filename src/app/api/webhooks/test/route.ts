import { headers } from 'next/headers'

export async function POST() {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log("headers: ", svix_id)
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }
  return Response.json({ message: 'The route is working' })
}