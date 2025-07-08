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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
// import type { IBook } from "@/types"
import { useCreateBookMutation } from "@/redux/api/baseApi"
import { toast } from "react-toastify"
import type { IBook } from "@/types"


export default function AddTaskModal() {
  const form = useForm<IBook>()
  const [open, setOpen] = useState(false)

  const [createBook, { isLoading }] = useCreateBookMutation()

  
  const onSubmit = async (data: IBook) => {
    console.log({ ...data })
    // disPatch(addTask(data))
    const bookData = {
      ...data,
      available: true
    };
    const res = await createBook(bookData).unwrap() // call createTask function in baseApi
    console.log("insite submit function", res);
    if(res.success){
      toast.success(res.message)
    }
    if(res.success === false){
      toast.error(res.error.message)
    }
    if(res.error){
      toast.error(res.error.errorResponse.errmsg)
    }
    setOpen(false)
    form.reset()
  }


  // if(isLoading){
  //   return <div>Loading...</div>
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" text-white cursor-pointer" variant="custom">Add Book <Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Book Data</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
            </DialogHeader>

            {/* Title && author */}
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div>
                <Label className=" mb-3" htmlFor="title">Title</Label>
                <Input id="title" {...form.register("title",
                  {
                    required: "title is required"
                  }
                )} placeholder="Title" />


              </div>
              <div>
                <Label className=" mb-3" htmlFor="title">Author</Label>
                <Input id="title" {...form.register("author",
                  {
                    required: "title is required"
                  }

                )} placeholder="Author name" />
              </div>
            </div>

            {/* Priority && isbn*/}
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div>
                <Label className=" mb-3">Genre</Label>
                <Select onValueChange={(value) => form.setValue("genre", value
                )}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FICTION">FICTION</SelectItem>
                    <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                    <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                    <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                    <SelectItem value="FANTASY">FANTASY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className=" mb-3" htmlFor="title">ISBN</Label>
                <Input id="title" {...form.register("isbn",
                  {
                    required: "title is required",
                  })} placeholder="Isbn" />
              </div>
            </div>

            {/* Copies */}
            <div className="grid gap-2">
              <Label htmlFor="copies">Copies</Label>
              <Input type="number" id="copies" {...form.register("copies", { valueAsNumber: true, required: "isbn is required" })} placeholder="Copies" />
            </div>


            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register("description",
                {
                  required: "Description is required"
                }
              )} placeholder="Description" />
            </div>

            {/* user Select */}

            {/* <div className="grid gap-2">
              <Label>User</Label>
              <Select onValueChange={(value) => form.setValue("userId", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>

                <SelectContent>
                  {/* {
                    userArr.map((user) => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)
                  } */}
            {/* </SelectContent> */}
            {/* </Select> */}
            {/* </div> */}

            {/* Date Picker */}
            {/* <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
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
            /> */}

            <DialogFooter>
              <Button className=" mt-3 cursor-pointer" type="submit">{isLoading === true ? "Posting..." : "Post book"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
