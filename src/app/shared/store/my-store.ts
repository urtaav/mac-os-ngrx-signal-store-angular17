import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DESKTOP } from "../config/applications";
import { State } from "./state";
import { computed } from "@angular/core";
import { FolderSelection } from "../models/folder-selection";
import { Folder } from "../models/folder";

const initialState: State = {
    activeApplication: DESKTOP,
    selectedFolderIds: [],
    deletedFolderIds: [],
    folders: [
        {
            id: 0,
            title: 'desktop',
        },
        {
            id: 1,
            title: 'untitled',
            parentFolderId: 0,
        },
        {
            id: 2,
            title: 'tutorials',
            parentFolderId: 0,
        },
        {
            id: 3,
            title: 'assets',
            parentFolderId: 2,
        },
    ]
};

export const MyStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ folders, deletedFolderIds, selectedFolderIds }) => ({
        tutorialFolders: computed(() => {
            return folders()
                .filter(f => f.parentFolderId === 2 && !deletedFolderIds().includes(f.id))
                .map(f => {
                    return {
                        ...f,
                        selected: selectedFolderIds().includes(f.id),
                    };
                });
        }),

        desktopFolders: computed(() => {
            return folders()
                .filter(f => f.parentFolderId === 0 && !deletedFolderIds().includes(f.id))
                .map(f => {
                    return {
                        ...f,
                        selected: selectedFolderIds().includes(f.id),
                    };
                });
        }),

        trashFolders: computed(() => {
            return folders().filter(f => deletedFolderIds().includes(f.id));
        }),

        trashItemsCount: computed(() => {
            return deletedFolderIds().length;
        }),
    })),
    withMethods(({ folders, selectedFolderIds, deletedFolderIds, ...store }) => ({

        setActiveApplication(activeAppId = DESKTOP) {
            console.log("setActiveApplication")
            patchState(store, { activeApplication: activeAppId })
        },
        addNewFolder() {
            const miliseconds = new Date().getTime();
            const newFolder: Folder = {
                id: miliseconds,
                title: `${miliseconds}`,
                parentFolderId: 0
            };

            patchState(store, { folders: [...folders(), newFolder] })
        },
        toggleFolder(folderSelection: FolderSelection) {
            console.log("toggleFolder")
            if (folderSelection.selectedMultiple) {
                patchState(store, {
                  selectedFolderIds: [...selectedFolderIds(), folderSelection.id],
                });
              } else {
                patchState(store, {
                  selectedFolderIds: [folderSelection.id],
                });
              }
        },
        unselectAllFolders() {
            patchState(store, { selectedFolderIds: [] })
        },
        deleteSelectedFolders() {
            console.log("deleteSelectedFolders")
            patchState(store, { deletedFolderIds: [...deletedFolderIds(), ...selectedFolderIds()] })
        }
    }))
)