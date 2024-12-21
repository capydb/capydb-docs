const NEXT_PUBLIC_CAPYBARADB_URL = process.env.NEXT_PUBLIC_CAPYBARADB_URL;
const CAPYBARADB_ADMIN_API_KEY = process.env.CAPYBARADB_ADMIN_API_KEY;

export default async function sendFeedback({ message }: { message: string }) {
  const bodyContent = {
    message: message,
  };

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_CAPYBARADB_URL}/private/docs-feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-API-Key": `${CAPYBARADB_ADMIN_API_KEY}`,
        },
        body: JSON.stringify(bodyContent),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error();
    }

    return;
  } catch (error) {
    console.error(error);
  }
}
