import { Loader as LoaderSvg } from 'lucide-react';

export default function Loader() {
  return (
    <main className="flex h-screen items-center justify-center">
      <LoaderSvg className="h-8 w-8 animate-spin text-purple-600 transition-all" />
    </main>
  );
}
