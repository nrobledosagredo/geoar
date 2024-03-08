// trail-pagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface TrailPaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

export const TrailPagination: React.FC<TrailPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <Pagination className="mb-4">
      <PaginationContent>
        {/* Botón de página anterior */}
        <PaginationItem>
          <PaginationPrevious
            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
            aria-disabled={currentPage === 1}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage !== 1) {
                setCurrentPage(currentPage - 1)
              }
            }}
          />
        </PaginationItem>

        {/* Páginas */}
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => setCurrentPage(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Botón de página siguiente */}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }
            aria-disabled={currentPage === totalPages}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage !== totalPages) {
                setCurrentPage(currentPage + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
