import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";
import { nanoid } from "nanoid";
import axios from "axios";
import { toast } from "react-toastify";
const Category = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategory] = useState([]);
  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      setCategory(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      setCategory([...categories, res.data]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteCategory = async (id, title) => {
    try {
      if (confirm(`Are you sure delete ${title} category?`)) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategory(categories.filter((category) => category._id !== id));
        setInputText("");
        if (res.status === 200) {
          toast.success("Deleted " + title);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1">
      {categories.length === 0 ? (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin fa-2xl"></i>
        </div>
      ) : (
        <div>
          <Title className={"text-start text-[40px]"}>Category</Title>
          <div className="">
            <div className="flex gap-4 flex-1 items-center mt-5">
              <Input
                type={"text"}
                name="category"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              >
                Add a new category
              </Input>
              <button className="btn-primary" onClick={handleCreateCategory}>
                Add
              </button>
            </div>
            <div className="mt-10 max-h-[250px] overflow-auto pb-5">
              {categories.map((category) => {
                return (
                  <div
                    key={category._id}
                    className="flex justify-between items-center border-b-2 p-5 rounded-lg"
                  >
                    <b className="text-lg">{category.title}</b>
                    <button
                      type="button"
                      className="btn-primary !bg-danger"
                      onClick={() =>
                        handleDeleteCategory(category._id, category.title)
                      }
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
