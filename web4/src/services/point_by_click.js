import {setX, setY} from '../store/point_slice';
import {send_point} from './send_point';

export async function point_by_click(e, dispatch, R) {

    const layer = e.target.getStage();
    const pointerPosition = layer.getPointerPosition();

    const x = (pointerPosition.x - 400) / (13.6 * 5);
    const y = -(pointerPosition.y - 400) / (13.6 * 5);

    dispatch(setX(x));
    dispatch(setY(y));

    await send_point(dispatch, x, y, R);
}