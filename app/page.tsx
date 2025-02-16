import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"

const sampleLibraries = [
  {
    id: 1,
    name: "Chakra UI",
    url: "https://chakra-ui.com/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 2,
    name: "Mantine",
    url: "https://mantine.dev/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 3,
    name: "Material UI",
    url: "https://mui.com/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 4,
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 5,
    name: "Bootstrap",
    url: "https://getbootstrap.com/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 6,
    name: "Ant Design",
    url: "https://ant.design/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 7,
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    categories: ["UI Framework", "Design System"],
  },
  {
    id: 7,
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    categories: ["UI Framework", "Design System"],
  },
]

const mainFeatures = ["Styled", "CSS-in-JS", "Tailwind Based", "Unstyled", "CSS Only"]

const additionalFeatures = ["Fully Typed", "Accessibility", "Unstyled", "CSS Only"]

export default function Home() {
  return (
    <div className="font-geist-sans relative flex h-screen flex-col items-center justify-between">
      <div className="static -z-10 h-screen w-full overflow-hidden">
        <div className="absolute -top-[50%] -left-[25%] size-[1100px] rounded-full bg-[#b394fb] opacity-50 mix-blend-multiply blur-3xl filter 2xl:size-[1500px]"></div>
        <div className="absolute -right-[25%] -bottom-[50%] size-[1100px] rounded-full bg-[#fb94cb] opacity-50 mix-blend-multiply blur-3xl filter 2xl:size-[1500px]"></div>

        <div className="absolute -right-[1%] -bottom-[80%] size-[1100px] rounded-full bg-white blur-3xl filter 2xl:size-[1500px]"></div>
        <div className="absolute -top-[80%] -left-[1%] size-[1100px] rounded-full bg-white blur-3xl filter 2xl:size-[1500px]"></div>
      </div>

      <header className="fixed z-50 flex h-20 w-full items-center justify-between border-b border-gray-200/20 bg-white/70 px-10 backdrop-blur-lg">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-semibold text-transparent">
          React UI Library Picker
        </div>
      </header>

      <main className="mt-20 flex w-full max-w-7xl flex-1 flex-col items-center space-y-4 px-4 text-center">
        <div>
          <h1 className="text-5xl font-bold">Find Your Perfect React UI Library</h1>
          <p className="max-w-2xl text-xl text-gray-600">
            Discover and compare the best React UI libraries to build stunning interfaces.
            Stop the endless searching - find the right tools for your next project.
          </p>
        </div>
        <div className="mt-6 flex w-full flex-grow sm:mt-8">
          <div className="sticky top-0 w-1/4 flex-shrink-0 rounded-lg border border-gray-200 bg-white p-4">
            <div className="w-full">
              <div>
                <Accordion type="multiple">
                  <AccordionItem value="main-feature">
                    <AccordionTrigger>Main Features</AccordionTrigger>
                    <AccordionContent className="grid w-full grid-cols-2 gap-1">
                      {mainFeatures.map((feature) => (
                        <Button key={feature} variant="outline" className="w-full">
                          {feature}
                        </Button>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="additional-feature">
                    <AccordionTrigger>Additional Features</AccordionTrigger>
                    <AccordionContent className="grid w-full grid-cols-2 gap-1">
                      {additionalFeatures.map((feature) => (
                        <Button key={feature} variant="outline" className="w-full">
                          {feature}
                        </Button>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="ml-4 flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 content-start gap-6 lg:grid-cols-2">
              {sampleLibraries.map((library) => (
                <Card
                  key={library.id}
                  className="text-foreground bg-background flexmin-h-[180px] w-auto rounded-lg border border-gray-200 px-3 py-2"
                >
                  <CardHeader>{library.name}</CardHeader>
                  <Image src="/logo.png" alt={library.name} width={100} height={100} />
                  <CardFooter>{library.url}</CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
