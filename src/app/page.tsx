import {BGThemePicker} from "../internal_components/FloraThemePicker";

export default function Index() {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            background: "#484747",
            overflow: "hidden"
        }}>
            <BGThemePicker />
        </div>
    );
}
