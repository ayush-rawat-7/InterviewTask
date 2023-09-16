"use client";
import Modal from "./Modal";
import { useState } from "react";

function FilterModal(props: any) {
  const [modalFilters, setModalFilters]: any = useState({
    category: [],
    tags: [],
  });
  return (
    <Modal
      setOpen={props.setIsModalOpen}
      isOpen={props.isModalOpen}
      setFilterApplied={props.setIsFilterApplied}
    >
      <div className="w-[90vw] lg:w-[70vw] bg-white h-[50vh] rounded-lg p-2">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-lg">Filter By:</p>
          <div className="flex gap-3">
            <button
              className="py-1 px-2 bg-black text-white rounded-md"
              onClick={() => {
                props.setSelectedFilters({
                  category: [],
                  tags: [],
                });
                setModalFilters({
                  category: [],
                  tags: [],
                });
                props.setIsFilterApplied(false);
                props.setIsModalOpen(false);
              }}
            >
              Reset
            </button>
            <button
              className="py-1 px-2 bg-black text-white rounded-md"
              onClick={() => {
                props.setSelectedFilters(modalFilters);
                props.setIsFilterApplied(true);
                props.setIsModalOpen(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
        <hr />

        <div className="flex flex-col mt-3">
          <p className="font-medium text-lg"> Category:</p>
          <div className="mt-2 pl-2">
            {props.filters?.categories?.map((category: any) => {
              return (
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="outline-none"
                    checked={modalFilters.category?.includes(category)}
                    name=""
                    id=""
                    onChange={(e) => {
                      let arr = modalFilters.category;

                      if (arr.includes(category)) {
                        let newArr = arr.filter((val: any) => val !== category);
                        setModalFilters({
                          ...modalFilters,
                          category: newArr,
                        });
                      } else {
                        let newArr = [...arr, category];
                        setModalFilters({
                          ...modalFilters,
                          category: newArr,
                        });
                      }
                    }}
                  />
                  <p>{category}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <p className="font-medium text-lg"> Tags:</p>
          <div className="mt-2 pl-2">
            {props.filters?.tags?.map((tag: any) => {
              return (
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="outline-none"
                    checked={modalFilters.tags?.includes(tag)}
                    name=""
                    id=""
                    onChange={(e) => {
                      let arr = modalFilters.tags;

                      if (arr.includes(tag)) {
                        let newArr = arr.filter((val: any) => val !== tag);
                        setModalFilters({
                          ...modalFilters,
                          tags: newArr,
                        });
                      } else {
                        let newArr = [...arr, tag];
                        setModalFilters({
                          ...modalFilters,
                          tags: newArr,
                        });
                      }
                    }}
                  />
                  <p>{tag}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
