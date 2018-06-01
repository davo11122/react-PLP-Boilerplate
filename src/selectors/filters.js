import { createSelector } from 'reselect';

export const getFilters = store => store.get('filters');

export const getColors = createSelector(
  [getFilters],
  filters => filters.get('colors')
);

export const getSelectedColors = createSelector(
  [getColors],
  (colors) => {
    const selectedColors = colors.filter(v => v).keySeq();
    if (selectedColors.size) {
      return selectedColors;
    }
    return colors.keySeq();
  }
);

export const getCategories = createSelector(
  [getFilters],
  filters => filters.get('categories')
);

export const getSelectedCategories = createSelector(
  [getCategories],
  (categories) => {
    const selectedCategories = categories.filter(v => v).keySeq();
    if (selectedCategories.size) {
      return selectedCategories;
    }
    return categories.keySeq();
  }
);
