schema relationships

Attach

1. __backdropAttach__ => createAttach
2. __handlers__ => constructOverlayRef
3. __createAttach__ - `only export`
4. __detachAttach__ => `export`, createAttach
5. __detachBackdropAttach__ => detachAttach
6. __detachContentWhenStableAttach__ => detachAttach
7. __disposeAttach__ => `export`, createAttach
8. __disposeBackdropAttach__ => [backdropTransitionendHandlerAttach, detachBackdropAttach, disposeAttach]
9. __disposeScrollStrategyAttach__ => [disposeAttach, updateScrollStrategyOverlayRef]
10. __hasAttached__ => `export`, [createAttach, detachAttach, disposeAttach, updatePositionStrategyOverlayRef, updateScrollStrategyOverlayRef]
11. __setDirectionAttach__ => `export`, createAttach
12. __toggleClassesAttach__ => [backdropAttach, detachContentWhenStableAttach, addPanelClassOverlayRef, removePanelClassOverlayRef]
13. __updateElementSizeAttach__ => createAttach
14. __updatePositionAttach__ - `only export`

OverlayRef

1. __constructOverlayRef__ - `only export`
2. __addPanelClassOverlayRef__ - `only export`
3. __removePanelClassOverlayRef__ - `only export`
4. __updatePositionStrategyOverlayRef__ - `only export`
5. __updateScrollStrategyOverlayRef__ - `only export`
6. __updateSizeOverlayRef__ - `only export`
6. __changesOverlayRef__ - `export`, 

Overlay

1. __createOverlay__ - `only export`
2. __changesOverlay__ - `only export` 

1. Разбить функции(interfaces?) на конструктор и на хуки
2. Переписать все сервисы для оверлея на функции?
3. Разбить жирные директиву(tooltip) на части(single responsibility)
