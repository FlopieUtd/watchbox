import { FormEventHandler, useState } from "react";
import { BRAND } from "src/constants";
import { Brand } from "src/types";

export const Manage = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4  ">
      <h1>Manage</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div>Brand</div>
          <select
            className="border"
            onChange={(e) => {
              setBrand(e.target.value as Brand);
            }}
          >
            {Object.values(Brand).map((b) => (
              <option key={b} value={b}>
                {BRAND[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <div>Model</div>
          <input
            type="text"
            onChange={(e) => {
              setModel(e.target.value);
            }}
            className="border"
          />
        </div>

        <div className="mb-4">
          <div>Reference</div>
          <input
            type="text"
            onChange={(e) => {
              setReference(e.target.value);
            }}
            className="border"
          />
        </div>

        <div>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};
