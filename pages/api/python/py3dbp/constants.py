import math

class RotationType:
    RT_WHD = 0
    RT_HWD = 1
    RT_HDW = 2
    RT_DHW = 3
    RT_DWH = 4
    RT_WDH = 5

    ALL = [RT_WHD, RT_HWD, RT_HDW, RT_DHW, RT_DWH, RT_WDH]
    # un upright or un updown
    Notupdown = [RT_WHD,RT_HWD]

    def rotation_type_to_euler(rotation_type):
        # Assuming the default (RT_WHD) requires no rotation
        if rotation_type == RotationType.RT_WHD:
            return (0, 0, 0)  # No rotation
        elif rotation_type == RotationType.RT_HWD:
            return (0, 0, -math.pi / 2)  # -90 degrees around Z
        elif rotation_type == RotationType.RT_HDW:
            return (math.pi / 2, 0, -math.pi / 2)  # 90 degrees around X and -90 degrees around Z
        elif rotation_type == RotationType.RT_DHW:
            return (math.pi / 2, 0, 0)  # 90 degrees around X
        elif rotation_type == RotationType.RT_DWH:
            return (0, math.pi / 2, 0)  # 90 degrees around Y
        elif rotation_type == RotationType.RT_WDH:
            return (0, -math.pi / 2, 0)  # -90 degrees around Y
        return (0, 0, 0)  # Default no rotation


class Axis:
    WIDTH = 0
    HEIGHT = 1
    DEPTH = 2

    ALL = [WIDTH, HEIGHT, DEPTH]
