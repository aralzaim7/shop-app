import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //any async code you want!!
    try {
      const response = await fetch(
        `https://rn-shop-app-cefe7.firebaseio.com/products.json?auth=${token}`
        /*{
          DEFAULT is GET
          method: "GET",
          FOR GET DON'T NEED HEADERS
          headers: {
            "Content-Type": "application/json",
          },
          NO NEED BODY FOR GET
          body: JSON.stringify({ title, description, imageUrl, price }),
        }*/
      );

      if (!response.ok) {
        throw new Error(response.message);
      }
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      //send to custom analytics server
      throw new Error(err);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-app-cefe7.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    //any async code you want!!
    const response = await fetch(
      `https://rn-shop-app-cefe7.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-app-cefe7.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title: title,
        description: description,
        imageUrl: imageUrl,
      },
    });
  };
};
