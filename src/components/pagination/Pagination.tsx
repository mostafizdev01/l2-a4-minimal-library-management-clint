import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginationFunc: (page: number) => void;
}

export function PaginationDemo({
    currentPage,
    totalPages,
    paginationFunc
}: PaginationProps) {


    return (
        <Pagination>
            <PaginationContent className="flex justify-center">
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if (currentPage > 1) {
                                paginationFunc(currentPage - 1);
                            }
                        }}
                        className={currentPage === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer text-white"}                    />
                </PaginationItem>

                {/* Dynamic Page Numbers */}

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                paginationFunc(page);
                            }}
                            className={`cursor-pointer ${page === currentPage ? "bg-lime-500 text-white" : ""
                                }`}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => paginationFunc(currentPage + 1)}
                        className={currentPage === totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer text-white"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
