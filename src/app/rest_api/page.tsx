import { redirect } from 'next/navigation';

export default function RestApiPage() {
  // Redirect to the overview page
  redirect('/rest_api/overview');
} 