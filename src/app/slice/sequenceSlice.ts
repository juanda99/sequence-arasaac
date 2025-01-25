import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PictSequence,
  Sequence,
  PictSequenceApplyAll,
  PictSequenceSettingsForEdit,
  PictApiAraForEdit,
  PictApiAraSettingsApplyAll,
} from "../../types/sequence";

const sequenceInitialState: Sequence = [];

const sequenceSlice = createSlice({
  name: "sequence",
  initialState: sequenceInitialState,
  reducers: {
    addPictogram: (previousSequence, action: PayloadAction<PictSequence>) => [
      ...previousSequence,
      action.payload,
    ],

    insertPictogram: (
      previousSequence,
      action: PayloadAction<PictSequence>,
    ) => {
      previousSequence.splice(action.payload.indexSequence, 0, action.payload);
    },

    subtractPictogram: (previousSequence, action: PayloadAction<number>) =>
      previousSequence.filter(
        (pictogram) => pictogram.indexSequence !== action.payload,
      ),

    subtractLastPict: (previousSequence) => [...previousSequence.slice(0, -1)],

    addSequence: (previousSequence, action: PayloadAction<Sequence>) =>
      action.payload,

    renumberSequence: (previousSequence) =>
      previousSequence.map((pictogram, index) => ({
        ...pictogram,
        indexSequence: index,
      })),

    sortSequence: (previousSequence) =>
      previousSequence.sort((a, b) => a.indexSequence - b.indexSequence),

    selectedId: (
      previousSequence,
      action: PayloadAction<PictApiAraForEdit>,
    ) => {
      previousSequence.map(
        (pictogram, index) =>
          index === action.payload.indexSequence &&
          (pictogram.img.selectedId = action.payload.selectedId!),
      );
    },

    searched: (previousSequence, action: PayloadAction<PictApiAraForEdit>) => {
      previousSequence.map(
        (pictogram, index) =>
          index === action.payload.indexSequence &&
          (pictogram.img.searched = action.payload.searched!),
      );
    },

    updatePictSequence: (
      previousSequence,
      action: PayloadAction<PictSequence>,
    ) => {
      return previousSequence.map((pictogram, index) =>
        index === action.payload.indexSequence ? action.payload : pictogram,
      );
    },

    settingsPictApiAra: (
      previousSequence,
      action: PayloadAction<PictApiAraForEdit>,
    ) => {
      previousSequence.map(
        (pictogram, index) =>
          index === action.payload.indexSequence &&
          (pictogram.img.settings = action.payload.settings!),
      );
    },

    settingsPictSequence: (
      previousSequence,
      action: PayloadAction<PictSequenceSettingsForEdit>,
    ) => {
      previousSequence.map(
        (pictogram, index) =>
          index === action.payload.indexSequence &&
          (pictogram.settings = action.payload),
      );
    },

    pictAraSettingsApplyAll: (
      previousSequence,
      action: PayloadAction<PictApiAraSettingsApplyAll>,
    ) => {
      if (action.payload.skin)
        previousSequence.map(
          (pictogram) => (pictogram.img.settings.skin = action.payload.skin),
        );
      if (action.payload.hair)
        previousSequence.map(
          (pictogram) => (pictogram.img.settings.hair = action.payload.hair),
        );
      if (action.payload.color)
        previousSequence.map(
          (pictogram) => (pictogram.img.settings.color = action.payload.color),
        );
    },

    pictSequenceApplyAll: (
      previousSequence,
      action: PayloadAction<PictSequenceApplyAll>,
    ) => {
      if (action.payload.textPosition)
        previousSequence.map(
          (pictogram) =>
            (pictogram.settings.textPosition = action.payload.textPosition),
        );
      if (action.payload.fontFamily)
        previousSequence.map(
          (pictogram) =>
            (pictogram.settings.fontFamily = action.payload.fontFamily),
        );
    },

    borderInApplyAll: (
      previousSequence,
      action: PayloadAction<PictSequenceApplyAll>,
    ) => {
      previousSequence.map(
        (pictogram) => (pictogram.settings.borderIn = action.payload.borderIn!),
      );
    },

    borderOutApplyAll: (
      previousSequence,
      action: PayloadAction<PictSequenceApplyAll>,
    ) => {
      previousSequence.map(
        (pictogram) =>
          (pictogram.settings.borderOut = action.payload.borderOut!),
      );
    },

    fontSizeApplyAll: (
      previousSequence,
      action: PayloadAction<PictSequenceApplyAll>,
    ) => {
      previousSequence.map(
        (pictogram) => (pictogram.settings.fontSize = action.payload.fontSize),
      );
    },
  },
});

export const sequenceReducer = sequenceSlice.reducer;

export const {
  addPictogram: addPictogramActionCreator,
  insertPictogram: insertPictogramActionCreator,
  subtractPictogram: subtractPictogramActionCreator,
  subtractLastPict: subtractLastPictActionCreator,
  addSequence: addSequenceActionCreator,
  renumberSequence: renumberSequenceActionCreator,
  sortSequence: sortSequenceActionCreator,
  updatePictSequence: updatePictSequenceActionCreator,
  selectedId: selectedIdActionCreator,
  searched: searchedActionCreator,
  pictAraSettingsApplyAll: pictAraSettingsApplyAllActionCreator,
  pictSequenceApplyAll: pictSequenceApplyAllActionCreator,
  borderInApplyAll: borderInApplyAllActionCreator,
  borderOutApplyAll: borderOutApplyAllActionCreator,
  fontSizeApplyAll: fontSizeApplyAllActionCreator,
  settingsPictApiAra: settingsPictApiAraActionCreator,
  settingsPictSequence: settingsPictSequenceActionCreator,
} = sequenceSlice.actions;
