import Image from 'next/image'
import EditNavbar from './components/editorNavbar'
import OutputNavbar from './components/outputNavbar'

export default function Home() {
  const mobileClasses = ""
  const extendedClasses = ""
  const minimizedClasses = ""
  return (
    <main className="flex h-screen w-screen">
      <div className='flex w-full h-full md:flex-row flex-col'>
        <div className='md:w-1/2 w-full flex justify-center h-full border-r-2 md:border-r-black'>
          <EditNavbar />
        </div>

        <div className='md:w-1/2 w-full flex justify-center h-full'>
        <OutputNavbar />
        </div>
      </div>
    </main>
  )
}
