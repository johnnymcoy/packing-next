from .constants import RotationType, Axis
from .auxiliary_methods import intersect, set_to_decimal
from .visual import Painter

import copy

from collections import Counter


DEFAULT_NUMBER_OF_DECIMALS = 3
START_POSITION = [0, 0, 0]


class Item:
    def __init__(self, name, width, height, depth, weight, partno="test", typeof="cube", level=0, loadbear=0, upsidedown=False, color='red'):
        self.name = name
        self.width = width
        self.height = height
        self.depth = depth
        self.weight = weight
        self.rotation_type = 0
        self.position = START_POSITION
        self.number_of_decimals = DEFAULT_NUMBER_OF_DECIMALS
        #! Version 2
        self.partno = partno
        self.typeof = typeof
        # Packing Priority level ,choose 1-3
        self.level = level
        # loadbear
        self.loadbear = loadbear
        # Upside down? True or False
        self.upsidedown = upsidedown if typeof == 'cube' else False
        # Draw item color
        self.color = color

        
    def format_numbers(self, number_of_decimals):
        self.width = set_to_decimal(self.width, number_of_decimals)
        self.height = set_to_decimal(self.height, number_of_decimals)
        self.depth = set_to_decimal(self.depth, number_of_decimals)
        self.weight = set_to_decimal(self.weight, number_of_decimals)
        self.number_of_decimals = number_of_decimals

    def __str__(self):
        return "%s(%sx%sx%s, weight: %s) pos(%s) rt(%s) vol(%s)" % (
            self.partno, self.name, self.width, self.height, self.depth, self.weight,
            self.position, self.rotation_type, self.get_volume()
        )

    def get_volume(self):
        return set_to_decimal(self.width * self.height * self.depth, self.number_of_decimals)
    
    #! Version 2
    def get_max_area(self):
        ""
        a = sorted([self.width, self.height, self.depth],reverse=True) if self.upsidedown == True else [self.width, self.height, self.depth]
        return set_to_decimal(a[0] * a[1], self.number_of_decimals)
    
        
    def get_rotation(self):
        return RotationType.ALL[self.rotation_type]
    

    def get_dimension(self):
        ''' rotation type '''
        if self.rotation_type == RotationType.RT_WHD:
            dimension = [self.width, self.height, self.depth]
        elif self.rotation_type == RotationType.RT_HWD:
            dimension = [self.height, self.width, self.depth]
        elif self.rotation_type == RotationType.RT_HDW:
            dimension = [self.height, self.depth, self.width]
        elif self.rotation_type == RotationType.RT_DHW:
            dimension = [self.depth, self.height, self.width]
        elif self.rotation_type == RotationType.RT_DWH:
            dimension = [self.depth, self.width, self.height]
        elif self.rotation_type == RotationType.RT_WDH:
            dimension = [self.width, self.depth, self.height]
        else:
            dimension = []
        return dimension
    
    #! TODO needs to be finished and calculated
    def adjust_position_after_rotation(self):
        if self.rotation_type == RotationType.RT_WHD:
            # No rotation, no adjustment needed
            pass
        elif self.rotation_type == RotationType.RT_HWD:
            print()
            # Adjust position after rotation around some axis (example)
            # self.position[0] += (self.height - self.width) / 2#self.depth / 2#(self.height - self.width) / 2
            #self.position[1] += self.depth#(self.width - self.height) / 2

        # ... (similar adjustments for other rotation types)
        # Ensure the item does not exceed the boundaries of the bin
        # (need to add checks here to ensure the item's position is within the bin's boundaries)
        return self


class Bin:
    def __init__(self, name, width, height, depth, max_weight, partno="example", quantity=10, corner=0,put_type=1):
        self.name = name
        self.width = width
        self.height = height
        self.depth = depth
        self.max_weight = max_weight
        self.items = []
        self.unfitted_items = []
        self.number_of_decimals = DEFAULT_NUMBER_OF_DECIMALS
        self.quantity = quantity,
        #! Version 2
        self.partno = partno,
        self.corner = corner,       # container coner
        self.put_type = put_type,   # add the order of placing items
        # used to put gravity distribution
        self.gravity = []
        self.support_surface_ratio = 0
        self.fix_point = False
        self.check_stable = False

    def format_numbers(self, number_of_decimals):
        self.width = set_to_decimal(self.width, number_of_decimals)
        self.height = set_to_decimal(self.height, number_of_decimals)
        self.depth = set_to_decimal(self.depth, number_of_decimals)
        self.max_weight = set_to_decimal(self.max_weight, number_of_decimals)
        self.number_of_decimals = number_of_decimals

    def string(self):
        return "%s(%sx%sx%s, max_weight:%s) vol(%s)" % (
            self.partno, self.name, self.width, self.height, self.depth, self.max_weight,
            self.get_volume()
        )

    def get_volume(self):
        return set_to_decimal(
            self.width * self.height * self.depth, self.number_of_decimals
        )

    def get_total_weight(self):
        total_weight = 0
        for item in self.items:
            total_weight += item.weight
        return set_to_decimal(total_weight, self.number_of_decimals)


    def put_item(self, item, pivot, axis=None):
        ''' put item in bin '''

        best_fit = None
        best_fit_volume = float('inf')
        valid_item_position = item.position
        item.position = pivot
        for i in range(0, len(RotationType.ALL)):
            item.rotation_type = i
            dimension = item.get_dimension()
            # rotatate
            if (
                self.width < pivot[0] + dimension[0] or
                self.height < pivot[1] + dimension[1] or
                self.depth < pivot[2] + dimension[2]
            ):
                continue

            fit = True

            for current_item_in_bin in self.items:
                if intersect(current_item_in_bin, item):
                    fit = False
                    break

            if fit:
                volume = dimension[0] * dimension[1] * dimension[2]
                if volume < best_fit_volume:
                    best_fit = i
                    best_fit_volume = volume
        if best_fit is not None:
            item.rotation_type = best_fit
            item.adjust_position_after_rotation()  # Adjust position after rotation
            item_copy = copy.deepcopy(item)
            self.items.append(item_copy)
            return True
        else:
            item.position = valid_item_position
            return False

    
class Packer:
    def __init__(self):
        self.bins = []
        self.items = []
        self.unfit_items = []
        self.total_items = 0

    def add_bin(self, bin):
        return self.bins.append(bin)

    def add_item(self, item):
        self.total_items = len(self.items) + 1

        return self.items.append(item)

    def pack_to_bin(self, bin, item):
        fitted = False

        if not bin.items:
            response = bin.put_item(item, START_POSITION)

            if not response:
                bin.unfitted_items.append(item)

            return

        for axis in range(0, 3):
            items_in_bin = bin.items

            for ib in items_in_bin:
                pivot = [0, 0, 0]
                w, h, d = ib.get_dimension()
                if axis == Axis.WIDTH:
                    pivot = [
                        ib.position[0] + w,
                        ib.position[1],
                        ib.position[2]
                    ]
                elif axis == Axis.HEIGHT:
                    pivot = [
                        ib.position[0],
                        ib.position[1] + h,
                        ib.position[2]
                    ]
                elif axis == Axis.DEPTH:
                    pivot = [
                        ib.position[0],
                        ib.position[1],
                        ib.position[2] + d
                    ]

                if bin.put_item(item, pivot):
                    fitted = True
                    break
            if fitted:
                break

        if not fitted:
            # print(item)
            # bin.unfitted_items.append(item)
            item_copy = copy.deepcopy(item)
            bin.unfitted_items.append(item_copy)
    def pack(
        self, bigger_first=False, distribute_items=True, #distribute_items=False,
        number_of_decimals=DEFAULT_NUMBER_OF_DECIMALS
    ):
        for bin in self.bins:
            bin.format_numbers(number_of_decimals)

        for item in self.items:
            item.format_numbers(number_of_decimals)

        self.bins.sort(
            key=lambda bin: bin.get_volume(), reverse=bigger_first
        )
        self.items.sort(
            key=lambda item: item.get_volume(), reverse=bigger_first
        )

        for bin in self.bins:
            for item in self.items:
                self.pack_to_bin(bin, item)

            if distribute_items:
                for item in bin.items:
                    self.items.remove(item)

