import Link from 'next/link';

export default function Home() {
  return (
    <main className='h-screen flex flex-col justify-center items-center bg-white'>
      <h1 className='text-center text-black mb-8'>three js nextjs starter</h1>
      <div className='mt-4 flex flex-col justify-center items-center'>
        <Link
          className='text-black bg-slate-500 p-3 hover:text-white rounded-md mb-2 text-center min-w-80' // Add min-w-[200px] class
          href='/floorplan'
        >
          Floorplan
        </Link>
        <Link
          className='text-black bg-slate-500 p-3 hover:text-white rounded-md mb-2 text-center min-w-80' // Add min-w-80 class
          href='/floorplanhtml'
        >
          Floorplan + attached html anchors
        </Link>
        <Link
          className='text-black bg-slate-500 p-3 hover:text-white rounded-md mb-2 text-center min-w-80' // Add min-w-80 class
          href='/cubes'
        >
          Cubes
        </Link>
        <Link
          className='text-black bg-slate-500 p-3 hover:text-white rounded-md mb-2 text-center min-w-80' // Add min-w-80 class
          href='/r3fdemo'
        >
          Frame Animation
        </Link>
      </div>
    </main>
  );
}
