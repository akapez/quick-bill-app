import { auth } from '@lib/auth';

import Header from '@components/common/Header';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      id: session.user.id,
      role: session.user.role,
    };
  }
  return (
    <div>
      <Header
        name={session?.user?.name || ''}
        imageUrl={session?.user?.image || ''}
      />
      {JSON.stringify(session)}
      {children}
    </div>
  );
}
