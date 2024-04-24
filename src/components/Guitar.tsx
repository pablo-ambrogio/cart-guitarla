import { Dispatch } from "react";
import type { Guitar } from "../types/types";
import type { CartActions } from "../reducers/car-reducer";

type GuitarProps = {
    guitar: Guitar;
    // definimos el dispatch en el type
    dispatch: Dispatch<CartActions>;
};

export default function Guitar({ guitar, dispatch }: GuitarProps) {
    const { name, image, description, price } = guitar;

    // Los "SET" del useState se le pasa un colback y
    // recibe el state previo y no hace falta de pasar el state
    //* setCart(prevCart => [...prevCart, guitar])

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img
                    className="img-fluid"
                    src={`/img/${image}.jpg`}
                    alt="imagen guitarra"
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">
                    {name}
                </h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    // usamos el dispatch para agregar una guitarra
                    onClick={() =>
                        dispatch({
                            type: "add-to-cart",
                            payload: { item: guitar },
                        })
                    }
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}
