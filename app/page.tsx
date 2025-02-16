import Image from "next/image"

export default function Home() {
  const sampleLibraries = [
    { name: "Chakra UI", url: "https://chakra-ui.com/" },
    { name: "Mantine", url: "https://mantine.dev/" },
    { name: "Material UI", url: "https://mui.com/" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    { name: "Bootstrap", url: "https://getbootstrap.com/" },
    { name: "Ant Design", url: "https://ant.design/" },
    { name: "Framer Motion", url: "https://www.framer.com/motion/" },
  ]

  return (
    <div className="font-geist-sans relative flex h-screen flex-col items-center justify-between overflow-hidden">
      <div className="absolute -z-10 h-full w-full">
        <div className="animate-blob absolute -top-[50%] -left-[25%] size-[1100px] rounded-full bg-[#b394fb] opacity-50 mix-blend-multiply blur-3xl filter 2xl:size-[1500px]"></div>
        <div className="animate-blob absolute -right-[25%] -bottom-[50%] size-[1100px] rounded-full bg-[#fb94cb] opacity-50 mix-blend-multiply blur-3xl filter 2xl:size-[1500px]"></div>

        <div className="absolute -right-[1%] -bottom-[80%] size-[1100px] rounded-full bg-white blur-3xl filter 2xl:size-[1500px]"></div>
        <div className="absolute -top-[80%] -left-[1%] size-[1100px] rounded-full bg-white blur-3xl filter 2xl:size-[1500px]"></div>
      </div>

      <header className="fixed z-50 flex h-20 w-full items-center justify-between border-b border-gray-200/20 bg-white/70 px-10 backdrop-blur-lg">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-semibold text-transparent">
          React UI Library Picker
        </div>
      </header>

      <main className="my-20 flex w-full max-w-7xl flex-1 flex-col items-center space-y-4 px-4 text-center">
        <div>
          <h1 className="text-5xl font-bold">Find Your Perfect React UI Library</h1>
          <p className="max-w-2xl text-xl text-gray-600">
            Discover and compare the best React UI libraries to build stunning interfaces.
            Stop the endless searching - find the right tools for your next project.
          </p>
        </div>
        <div className="mt-6 flex w-full flex-grow justify-center gap-4 sm:mt-8">
          <div className="flex w-1/3 flex-col border border-gray-200">Sidebar</div>
          <div className="grid flex-grow grid-cols-1 content-start gap-6 lg:grid-cols-2">
            {sampleLibraries.map((library) => (
              <div
                key={library.name}
                className="min-h-[180px] w-auto rounded-lg border border-gray-200 bg-white px-3 py-2"
              >
                <Image src="/logo.svg" alt={library.name} width={100} height={100} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 flex h-20 w-full items-center justify-center bg-white/60 backdrop-blur-lg">
        <div> 2024 React UI Library Picker</div>
      </footer>
    </div>
  )
}
