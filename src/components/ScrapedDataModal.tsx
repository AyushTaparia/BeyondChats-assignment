import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

interface ScrapedDataModalProps {
  isOpen: boolean
  closeModal: () => void
  url: string
  chunks: string[]
}

export default function ScrapedDataModal({ isOpen, closeModal, url, chunks }: ScrapedDataModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all md:m-0 m-3">
                <Dialog.Title as="h3" className="md:text-lg text-xs font-medium leading-6 text-white mb-4">
                  Scraped Data for : {url}
                </Dialog.Title>
                <div className="mt-2 max-h-96 overflow-y-auto">
                  {chunks.map((chunk, index) => (
                    <div key={index} className="mb-4 p-3 bg-gray-700 rounded-xl">
                      <p className="md:text-sm text-xs text-white">{chunk}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 justify-end flex">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-full border border-transparent bg-zinc-400 px-3 py-2 text-sm font-medium text-white md:hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

