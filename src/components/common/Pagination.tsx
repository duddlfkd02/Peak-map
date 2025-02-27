import { useEffect, useState } from "react";
import prevArrow from "../../assets/images/left-arrow.svg";
import nextArrow from "../../assets/images/right-arrow.svg";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChage }) => {
  const visiblePages = 5;
  const [displayPages, setDisplayPage] = useState<number[]>([]);

  useEffect(() => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    setDisplayPage(Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index));
  }, [currentPage, totalPage]);

  return (
    <div className="flex w-full items-center justify-between">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 transition-transform duration-200 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:scale-110"
        }`}
      >
        <img src={prevArrow} alt="이전 버튼" className="h-5 w-5" />
      </button>

      {/* 페이지 번호 (5개씩만 표시) */}
      <div className="flex flex-1 justify-center gap-2 transition-opacity duration-300 ease-in-out">
        {displayPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChage(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-primary scale-110 text-white shadow-md"
                : "bg-gray-200 text-black hover:scale-105 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChage(currentPage + 1)}
        disabled={currentPage === totalPage}
        className={`p-2 transition-transform duration-200 ${
          currentPage === totalPage ? "cursor-not-allowed opacity-50" : "hover:scale-110"
        }`}
      >
        <img src={nextArrow} alt="다음 버튼" className="h-5 w-5" />
      </button>
    </div>
  );
};
export default Pagination;
