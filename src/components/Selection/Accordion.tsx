import { StyleSheet, View } from 'react-native';
import { LocationButton } from '@/src/components/Button/LocationButton';
import type { LocationPosition } from '@/src/components/Button/LocationButton';

const CELL_WIDTH = 83;
const NUM_COLUMNS = 4;
const DISTRICT_BG = 'rgba(255, 242, 166, 0.7)';
const DISTRICT_SELECTED_COLOR = 'rgba(255, 242, 166, 1)';

type AccordionProps = {
  city: string;
  position?: LocationPosition;
  districts: string[];
  expanded: boolean;
  selectedDistricts?: string[];
  onToggle: () => void;
  onDistrictToggle: (district: string) => void;
};

export const Accordion = ({
  city,
  position = 'topLeft',
  districts,
  expanded,
  selectedDistricts = [],
  onToggle,
  onDistrictToggle,
}: AccordionProps) => {
  return (
    <View>
      <LocationButton label={city} position={position} selected={expanded} onPress={onToggle} />

      {expanded && (
        <View style={styles.grid}>
          {districts.map((district) => (
            <LocationButton
              key={district}
              label={district}
              position="middle"
              selected={selectedDistricts.includes(district)}
              defaultBg={DISTRICT_BG}
              selectedColor={DISTRICT_SELECTED_COLOR}
              textWeight="regular"
              onPress={() => onDistrictToggle(district)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CELL_WIDTH * NUM_COLUMNS,
  },
});
