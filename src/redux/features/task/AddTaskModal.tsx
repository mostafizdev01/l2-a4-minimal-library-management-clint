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
// import { useAppDispatch, useAppSelector } from "@/redux/middlewares/hook"
// import { addTask } from "./taskSlice"
import { useState } from "react"
import { Form } from "@/components/ui/form"
// import { useCreateTaskMutation } from "@/redux/api/baseApi"


export default function AddTaskModal() {
  const form = useForm()
  const [open, setOpen] = useState(false)

  // const [ createTask, { data, isError, isLoading} ] = useCreateTaskMutation()


  // const userArr = useAppSelector((state) => state.user.users)
  // console.log(userArr)
  // const disPatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log({ ...data })
    // disPatch(addTask(data))
    // const taskData = {
    //   ...data,
    //   isCompleted: false
    // };
    // const res = await createTask(taskData).unwrap() // call createTask function in baseApi
    // console.log("insite submit function", res);
    
    setOpen(false)
    form.reset()
  }

  // if(isLoading){
  //   return <div>Loading...</div>
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" text-white cursor-pointer" variant="custom">Add Task <Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Task</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
            </DialogHeader>

            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} placeholder="Title" />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...form.register("description")} placeholder="Description" />
            </div>

            {/* Priority Select */}
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select onValueChange={(value) => form.setValue("priority", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
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
              <Button className=" mt-3 cursor-pointer" type="submit">Post book</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
