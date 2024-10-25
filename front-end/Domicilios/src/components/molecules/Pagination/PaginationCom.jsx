import { Button, Pagination } from "@nextui-org/react";
import PropTypes from "prop-types";

export const Paginacion = ({
  personaPerPage,
  currentPage,
  setCurrentPage,
  total,
}) => {
  const pageNumbers = Math.ceil(total / personaPerPage);

  const previosPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <Pagination
          total={pageNumbers}
          radius="sm"
          color="primary"
          onChange={(pageNumbers) => setCurrentPage(pageNumbers)}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            color="primary"
            isDisabled={currentPage === 1}
            onClick={previosPage}
          >
            Previous
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={onNextPage}
            isDisabled={currentPage >= pageNumbers}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

Paginacion.propTypes = {
  personaPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  total: PropTypes.number,
};
