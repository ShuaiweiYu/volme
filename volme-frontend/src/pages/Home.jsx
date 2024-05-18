import logo from "../logo.svg";
import { useTranslation } from 'react-i18next';

const TestComp1 = ({t}) => (
    <>
        <p>{t("test")}</p>
    </>
)

const TestComp2 = () => {
    const { t } = useTranslation();
    return (
        <>
            <p>{t("test")}</p>
        </>
    );
};

const Home = () => {
    const { t } = useTranslation();

    return (
        <div>
            <TestComp1 t={t}/>
            <TestComp2 />
            <p>{t("test")}</p>
            <img src={logo} className="App-logo" alt="logo"/>
        </div>
    )
}

export default Home;