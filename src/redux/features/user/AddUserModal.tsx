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
import { useDispatch } from "react-redux"
import { addUser } from "./userSlice"
// import { useAppDispatch } from "@/redux/middlewares/hook"
// import { useAppDispatch } from "@/redux/middlewares/hook"
// import { addTask } from "./taskSlice"

export default function AddUserModal() {
  const form = useForm()

    const disPatch = useDispatch();

  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data)
    disPatch(addUser(data))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Task</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
            </DialogHeader>

            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("name")} placeholder="Enter your name" />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
