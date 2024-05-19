import logo from "../logo.svg";
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../features/exampleSlice';
import {useGetAllUsersQuery} from '../features/exampleApiSlice'

const TestComp1 = ({t}) => (
    <>
        <p>{t("test")}</p>
    </>
)

const TestComp2 = () => {
    const {t} = useTranslation();
    return (
        <>
            <p>{t("test")}</p>
        </>
    );
};

const Home = () => {
    // i18n
    const {t} = useTranslation();

    // redux
    const count = useSelector((state) => state.exampleCounter.count); // 更新为新的 app key
    const dispatch = useDispatch();

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllUsersQuery();

    const showUsersInfo = () => {
        console.log(users);
    }

    return (
        <>
            <div>
                <img src={logo} className="App-logo" alt="logo" style={{height: "100px"}}/>

                <h1>i18n Example</h1>
                <h2>国际化使用i18n，不要直接文字放在代码里面，把所有的文字放到public文件架下的locales里面，使用例子看Home组件</h2>
                <TestComp1 t={t}/>
                <TestComp2/>
                <p>{t("test")}</p>

                <h1>Redux Example</h1>
                <h2>状态管理和Query都用redux，小例子也看Home</h2>
                <div>
                    <p>Count: {count}</p>
                    <button onClick={() => dispatch(increment())}>Increment</button>
                    <button onClick={() => dispatch(decrement())}>Decrement</button>
                </div>

                <h1>RTK Query Example</h1>
                <button onClick={showUsersInfo}>Show Users Info</button>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {isSuccess && (
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>{user.username}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Home;