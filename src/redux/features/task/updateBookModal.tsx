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
import { SquarePen } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import type { IBook } from "@/types"
import { useForm } from "react-hook-form"
import { useGetSingleBookQuery } from "@/redux/api/baseApi"
import { toast } from "react-toastify"
import { useUpdateBookMutation } from "@/redux/api/baseApi"

interface UpdateBookModalPorps {
    id: string
}

export default function UpdateBookModal({ id }: UpdateBookModalPorps) {
    const [open, setOpen] = useState(false);
    const [updateBook, {isLoading}] = useUpdateBookMutation();

    // get single data on id
    const { data, refetch } = useGetSingleBookQuery(id);

    const form = useForm<IBook>()


    useEffect(() => {
        if (data?.data?.genre) {
            form.setValue("genre", data.data.genre);
        }
    }, [data, form]);

    const onSubmit = async (data: IBook) => {

        console.log({ ...data })
        // disPatch(addTask(data))
        const bookData = {
            ...data,
           id
        };
        const res = await updateBook(bookData).unwrap() // call createTask function in baseApi
        console.log("insite submit function", res);
        if (res.success) {
            toast.success(res.message)
            refetch()
        }
        if (res.success === false) {
            toast.error(res.error.message)
        }
        if (res.error) {
            toast.error(res.error.errorResponse.errmsg)
        }
        setOpen(false)
        form.reset()
    }




    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className=" text-white cursor-pointer" variant="destructive"><SquarePen /></Button>
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
                                    <Input defaultValue={data?.data?.title} id="title" {...form.register("title",
                                        {
                                            required: "title is required"
                                        }
                                    )} placeholder="Title" />


                                </div>
                                <div>
                                    <Label className=" mb-3" htmlFor="title">Author</Label>
                                    <Input defaultValue={data?.data?.author} id="title" {...form.register("author",
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
                                    <Select value={form.watch("genre")} onValueChange={(value) => form.setValue("genre", value
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
                                    <Input defaultValue={data?.data?.isbn} id="title" {...form.register("isbn",
                                        {
                                            required: "title is required",
                                        })} placeholder="Isbn" />
                                </div>
                            </div>

                            {/* Copies */}
                            <div className="grid gap-2">
                                <Label htmlFor="copies">Copies</Label>
                                <Input defaultValue={data?.data?.copies} type="number" id="copies" {...form.register("copies", { valueAsNumber: true, required: "isbn is required" })} placeholder="Copies" />
                            </div>


                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea defaultValue={data?.data?.description} id="description" {...form.register("description",
                                    {
                                        required: "Description is required"
                                    }
                                )} placeholder="Description" />
                            </div>
                            <DialogFooter>
                                <Button className=" mt-3 cursor-pointer" type="submit">{isLoading ? "Updating..." : "Update book"}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
