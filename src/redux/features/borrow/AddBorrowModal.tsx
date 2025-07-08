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
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { BookmarkPlus, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
// import { useAppDispatch, useAppSelector } from "@/redux/middlewares/hook"
// import { addTask } from "./taskSlice"
import { useState } from "react"
import type { IBorrow } from "@/types"
import { useCreateBorrowMutation, useGetSingleBookQuery } from "@/redux/api/baseApi"
import { toast } from "react-toastify"

interface borrowProps {
  bookData: [number, string]
}

export default function AddBorrowModal({ bookData }: borrowProps) {
  const [copies, id] = bookData
  const form = useForm<IBorrow>()
  const [open, setOpen] = useState(false)

  const [createBorrow, { isLoading }] = useCreateBorrowMutation()
  const { refetch } = useGetSingleBookQuery(id)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const borrowData = {
      ...data,
      book: id
    };

    const res = await createBorrow(borrowData).unwrap() // call createBorrow function in baseApi
    if (res.success) {
      form.reset()
      setOpen(false)
      toast.success(res.message)
      refetch();
    }

  }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={copies === 0 || copies < 0} className=" cursor-pointer shadow-lime-500 " variant={"secondary"}>Borrow <BookmarkPlus className="  text-lime-500 cursor-pointer" /></Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <DialogHeader>
              <DialogTitle>Borrow Book</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
            </DialogHeader>

            {/* quantity */}
            <div className="grid gap-2 mt-8">
              <Label htmlFor="quantity">Quantity</Label>
              <Input type="number" id="quantity" {...form.register("quantity")} placeholder="quantity" />
            </div>

            {/* Date Picker */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(buttonVariants({
                            // variant: "destructive"
                          }), "w-full pl-3 text-left font-normal text-white")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date("1900-01-01")
                        // }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className=" mt-3 cursor-pointer" type="submit">{isLoading ? "Please wait..." : "Borrow Now"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}