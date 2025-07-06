import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Form,
} from "@/components/ui/form"
import { BookmarkPlus } from "lucide-react"

interface borrowProps {
  book: number
}

export default function AddBorrowModal({book}: borrowProps) {
  const form = useForm()

  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data)
    // disPatch(addUser(data))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={book === 0 || book < 0} className=" cursor-pointer shadow-lime-500 " variant={"secondary"}>Borrow <BookmarkPlus className="  text-lime-500 cursor-pointer" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Borrow Data</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
            </DialogHeader>

            {/* Title */}
            <div className="grid gap-2 mt-5">
              <Label htmlFor="title">Quantity</Label>
              <Input type="number" id="title" {...form.register("name")} placeholder="Quantity" />
            </div>
            <DialogFooter>
              <Button type="submit">Save borrow</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
