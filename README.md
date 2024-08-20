# Redux toll kit
it will help to have access to the user's info to all the application
It should be inside the frontend src
1. install 
npm install @reduxjs/toolkit 
npm install react-redux
2. create a store inside frontend>src>store
3. wrap <App> with   <Provider store={store} >
4. create slice frontend>src>redux>user> userSlide.js

# redux-persist npm i redux-persist
Redux-porsessed for to keep users data even when they refresh the page. In this project i am going to sotre the these datas inside the local storage.

after installing frontend>src>redux>store.js instead of adding the userReducer need to add persistent reducer also we need to combine all the reducers.
means
export const store = configureStore({
    reducer: {user : userReducer},
    middleware :(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck : false,
    })
})

export const store = configureStore({
    reducer: persitedReducer,
    middleware :(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck : false,
    })
})


after this need to wrap the persist in index.js


utils > verifyUser > npm i cookie-parser in the root folder 