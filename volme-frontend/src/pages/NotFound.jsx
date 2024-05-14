import background from '../Assets/404background.webp';

const NotFound = () => {

    const h1Style = {
        position: 'absolute', // 绝对定位
        top: 80, // 顶部对齐
        width: '100%', // 使h1标签宽度与父元素一致
        textAlign: 'center', // 文本居中
    };
    // 使用内联样式对象来设置背景
    const backgroundStyle = {
        width: '100%',
        height: '100vh', // 使用视窗高度单位，使背景图片覆盖整个屏幕
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover', // 确保背景图片覆盖整个元素，保持图片的宽高比
        backgroundPosition: 'center', // 使背景图片居中
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <h1 style={h1Style}>404 - Not Found!</h1>
        </div>
    );
}

export default NotFound;