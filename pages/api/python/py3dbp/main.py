from .constants import RotationType, Axis
from .auxiliary_methods import intersect, set_to_decimal
from .visual import Painter

# required to plot a representation of Bin and contained items 
# import matplotlib.pyplot as plt
# from mpl_toolkits import mplot3d

import copy

#! Version 2
# import numpy as np
# import matplotlib.pyplot as plt
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
        # (you would need to add checks here to ensure the item's position is within the bin's boundaries)
        
        return self


class Bin:
    # def __init__(self, name, width, height, depth, max_weight):
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
        # self.fit_items = np.array([[0,width,0,height,0,0]])
        self.partno = partno,
        self.corner = corner,       # container coner
        self.put_type = put_type,   # add the order of placing items
        # used to put gravity distribution
        self.gravity = []
        self.support_surface_ratio = 0
        self.fix_point = False
        self.check_stable = False

    #! No longer needed
    def decrease_quantity(self):
        if self.quantity > 0:
            self.quantity -= 1
        else:
            raise ValueError("No more bins of this type available")

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
        # fit = False
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
                # #! cal total weight
                # if self.getTotalWeight() + item.weight > self.max_weight:

                volume = dimension[0] * dimension[1] * dimension[2]
                if volume < best_fit_volume:
                    best_fit = i
                    best_fit_volume = volume
                # if self.get_total_weight() + item.weight > self.max_weight:
                #     fit = False
                #     return fit

                # item_copy = copy.deepcopy(item)
                # self.items.append(item_copy)
        
            # if not fit:
            #     item.position = valid_item_position

            # return fit
        if best_fit is not None:
            item.rotation_type = best_fit
            item.adjust_position_after_rotation()  # Adjust position after rotation
            item_copy = copy.deepcopy(item)
            self.items.append(item_copy)
            # self.items.append(item)
            return True
        else:
            item.position = valid_item_position
            return False
        # if not fit:
        #     item.position = valid_item_position

        # return fit

    
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



##############################################################################################################################
##############################################################################################################################
##############################   PACKER     ####################################################################################
##############################################################################################################################
##############################################################################################################################

class Packer:
    
    def __init__(self):
        self.bins = []
        self.items = []
        self.unfit_items = []
        self.total_items = 0
        #! Version 2
        self.binding = []


    def add_bin(self, bin):
        return self.bins.append(bin)

    def add_item(self, item):
        self.total_items = len(self.items) + 1
        return self.items.append(item)
    
    # fix_point, check_stable, support_surface_ratio
    def pack_to_bin(self, bin, item):
        ''' pack item to bin '''
        fitted = False
        #! old
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
                    pivot = [ib.position[0] + w, ib.position[1], ib.position[2]]
                elif axis == Axis.HEIGHT:
                    pivot = [ib.position[0], ib.position[1] + h, ib.position[2]]
                elif axis == Axis.DEPTH:
                    pivot = [ib.position[0], ib.position[1], ib.position[2] + d]

                if bin.put_item(item, pivot):
                    fitted = True
                    break
            if fitted:
                break

        if not fitted:
            # bin.unfitted_items.append(item)
            item_copy = copy.deepcopy(item)
            bin.unfitted_items.append(item_copy)
            
    #! Version 2
    def sort_binding(self,bin):
        ''' sorted by binding '''
        b,front,back = [],[],[]
        for i in range(len(self.binding)):
            b.append([]) 
            for item in self.items:
                if item.name in self.binding[i]:
                    b[i].append(item)
                elif item.name not in self.binding:
                    if len(b[0]) == 0 and item not in front:
                        front.append(item)
                    elif item not in back and item not in front:
                        back.append(item)

        min_c = min([len(i) for i in b])
        
        sort_bind =[]
        for i in range(min_c):
            for j in range(len(b)):
                sort_bind.append(b[j][i])
        
        for i in b:
            for j in i:
                if j not in sort_bind:
                    self.unfit_items.append(j)

        self.items = front + sort_bind + back
        return
     
    def put_order(self):
        '''Arrange the order of items '''
        r = []
        for i in self.bins:
            # open top container
            if i.put_type == 2:
                i.items.sort(key=lambda item: item.position[0], reverse=False)
                i.items.sort(key=lambda item: item.position[1], reverse=False)
                i.items.sort(key=lambda item: item.position[2], reverse=False)
            # general container
            elif i.put_type == 1:
                i.items.sort(key=lambda item: item.position[1], reverse=False)
                i.items.sort(key=lambda item: item.position[2], reverse=False)
                i.items.sort(key=lambda item: item.position[0], reverse=False)
            else :
                pass
        return
    
    def gravity_center(self,bin):
        ''' 
        Deviation Of Cargo gravity distribution
        ''' 
        w = int(bin.width)
        h = int(bin.height)
        d = int(bin.depth)

        area1 = [set(range(0,w//2+1)),set(range(0,h//2+1)),0]
        area2 = [set(range(w//2+1,w+1)),set(range(0,h//2+1)),0]
        area3 = [set(range(0,w//2+1)),set(range(h//2+1,h+1)),0]
        area4 = [set(range(w//2+1,w+1)),set(range(h//2+1,h+1)),0]
        area = [area1,area2,area3,area4]

        for i in bin.items:

            x_st = int(i.position[0])
            y_st = int(i.position[1])
            if i.rotation_type == 0:
                x_ed = int(i.position[0] + i.width)
                y_ed = int(i.position[1] + i.height)
            elif i.rotation_type == 1:
                x_ed = int(i.position[0] + i.height)
                y_ed = int(i.position[1] + i.width)
            elif i.rotation_type == 2:
                x_ed = int(i.position[0] + i.height)
                y_ed = int(i.position[1] + i.depth)
            elif i.rotation_type == 3:
                x_ed = int(i.position[0] + i.depth)
                y_ed = int(i.position[1] + i.height)
            elif i.rotation_type == 4:
                x_ed = int(i.position[0] + i.depth)
                y_ed = int(i.position[1] + i.width)
            elif i.rotation_type == 5:
                x_ed = int(i.position[0] + i.width)
                y_ed = int(i.position[1] + i.depth)

            x_set = set(range(x_st,int(x_ed)+1))
            y_set = set(range(y_st,y_ed+1))

            # cal gravity distribution
            for j in range(len(area)):
                if x_set.issubset(area[j][0]) and y_set.issubset(area[j][1]) : 
                    area[j][2] += int(i.weight)
                    break
                # include x and !include y
                elif x_set.issubset(area[j][0]) == True and y_set.issubset(area[j][1]) == False and len(y_set & area[j][1]) != 0 : 
                    y = len(y_set & area[j][1]) / (y_ed - y_st) * int(i.weight)
                    area[j][2] += y
                    if j >= 2 :
                        area[j-2][2] += (int(i.weight) - x)
                    else :
                        area[j+2][2] += (int(i.weight) - y)
                    break
                # include y and !include x
                elif x_set.issubset(area[j][0]) == False and y_set.issubset(area[j][1]) == True and len(x_set & area[j][0]) != 0 : 
                    x = len(x_set & area[j][0]) / (x_ed - x_st) * int(i.weight)
                    area[j][2] += x
                    if j >= 2 :
                        area[j-2][2] += (int(i.weight) - x)
                    else :
                        area[j+2][2] += (int(i.weight) - x)
                    break
                # !include x and !include y
                elif x_set.issubset(area[j][0])== False and y_set.issubset(area[j][1]) == False and len(y_set & area[j][1]) != 0  and len(x_set & area[j][0]) != 0 :
                    all = (y_ed - y_st) * (x_ed - x_st)
                    y = len(y_set & area[0][1])
                    y_2 = y_ed - y_st - y
                    x = len(x_set & area[0][0])
                    x_2 = x_ed - x_st - x
                    area[0][2] += x * y / all * int(i.weight)
                    area[1][2] += x_2 * y / all * int(i.weight)
                    area[2][2] += x * y_2 / all * int(i.weight)
                    area[3][2] += x_2 * y_2 / all * int(i.weight)
                    break
        r = [area[0][2],area[1][2],area[2][2],area[3][2]]
        result = []
        for i in r :
            if sum(r) != 0:
                result.append(round(i / sum(r) * 100,2))
            else:
                result.append(0)  # or whatever value you want to append when there's a division by zero
            # result.append(round(i / sum(r) * 100,2))
        return result

     
    #! End 
            
    def pack(
        self, bigger_first=False, distribute_items=True, #distribute_items=False,
        #! Version 2
        fix_point=True, check_stable=True, support_surface_ratio=0.75, binding=[],
        number_of_decimals=DEFAULT_NUMBER_OF_DECIMALS
    ):
        '''pack master func '''

        for bin in self.bins:
            bin.format_numbers(number_of_decimals)

        for item in self.items:
            item.format_numbers(number_of_decimals)

        #! Version 2
        # add binding attribute
        self.binding = binding
        #! End
        # Bin : sorted by volume
        self.bins.sort(key=lambda bin: bin.get_volume(), reverse=bigger_first)
        # Item : sorted by volume -> sorted by loadbear -> sorted by level -> binding
        self.items.sort(key=lambda item: item.get_volume(), reverse=bigger_first)
        #! Version 2
        # self.items.sort(key=lambda item: item.getMaxArea(), reverse=bigger_first)
        # self.items.sort(key=lambda item: item.loadbear, reverse=True)
        # self.items.sort(key=lambda item: item.priority, reverse=False)
        # sorted by binding
        if binding != []:
            self.sort_binding(bin)
        #! End
        
        for idx,bin in enumerate(self.bins):
            # pack item to bin
            for item in self.items:
                self.pack_to_bin(bin, item)
            if binding != []:
                # resorted
                self.items.sort(key=lambda item: item.getVolume(), reverse=bigger_first)
                self.items.sort(key=lambda item: item.loadbear, reverse=True)
                self.items.sort(key=lambda item: item.priority, reverse=False)
                # clear bin
                bin.items = []
                bin.unfitted_items = self.unfit_items
                # bin.fit_items = np.array([[0,bin.width,0,bin.height,0,0]])
                # repacking
                for item in self.items:
                    self.pack_to_bin(bin, item,fix_point,check_stable,support_surface_ratio)
            # Deviation Of Cargo Gravity Center 
            self.bins[idx].gravity = self.gravity_center(bin)
            
            if distribute_items :
                for bitem in bin.items:
                    no = bitem.partno
                    for item in self.items :
                        if item.partno == no :
                            self.items.remove(item)
                            break
        # put order of items
        self.put_order()
        
        if self.items != []:
            self.unfit_items = copy.deepcopy(self.items)
            self.items = []
        # for item in self.items.copy():
        #     if item in bin.unfitted_items:
        #         self.items.remove(item)

        #! Old
        # for bin in self.bins:
        #     for item in self.items:
        #         self.pack_to_bin(bin, item)
            # if distribute_items:
            #     for item in bin.items:
            #         self.items.remove(item)
        #! END
        