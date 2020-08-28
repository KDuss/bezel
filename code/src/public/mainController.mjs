import { ObservableList } from './dataModel/observable/observable.js';

/**
 * Controller for managing the modules.
 * @typedef {Object} MainController
 * @property {function(BezelModule):void} addModule
 * @property {function(function(BezelModule):void):void} onModuleAdd
 * @property {function(BezelModule):void} activateModule
 * @property {function(function(BezelModule):void):void} onModuleActivate
 * @property {function(BezelModule):void} deactivateModule
 * @property {function(function(BezelModule):void):void} onModuleDeactivate
 * @property {function(BezelModule, Facet, number, Operation):void} activateFacet
 * @property {function(BezelModule, Facet):void}deactivateFacet
 * @property {function(BezelModule, Facet, TableFacetTarget|RegularFacetTarget):void} makeSelection
 * @property {function(BezelModule, BezelContainer, number):void} moveInFacet
 * @property {function():void} reset - Reset entire application
 * @property {function(BezelModule):void} resetModule - Reset the passed module and update all subsequent modules
 * @property {function(BezelModule, Facet):void} resetFacet - Reset the passed facet and update all subsequent modules
 * @property {function(string):BezelModule} getModuleByName
 */

/**
 * Create {@link MainController}.
 * @returns {MainController}
 */
const MainController = () => {
    /** All modules that can be utilized by the user. */
    const availableModules = ObservableList([]);
    /** The modules currently in use. */
    const modules = ObservableList([]);

    /**
     * Make a module available to the user.
     * @param {BezelModule} module
     */
    const addModule = module => {
        if (module == null) return;
        availableModules.add(module);
    };

    /**
     * Get a combined filter for all preceding modules.
     * @param {BezelModule} module
     * @param {boolean} include - True, if the filter for the passed module itself should be included
     *
     */
    const getFilterBefore = (module, include) => {
        const position = include
            ? modules.indexOf(module) + 1
            : modules.indexOf(module);
        return modules.list
            .filter(m => modules.indexOf(m) < position)
            .map(m => m.getFilter())
            .flat();
    };

    /**
     * Update passed module and all subsequent modules.
     * @param {BezelModule} module
     * @param {boolean} include - True, if the passed module itself should be updated as well
     */
    const updateSubsequent = (module, include) => {
        const filter = getFilterBefore(module, !include);
        console.log('filter before', filter);
        console.log('module index', modules.indexOf(module));
        const position = include
            ? modules.indexOf(module) - 1
            : modules.indexOf(module);
        modules.forEachAfter(position, m => {
            m.update(filter);
            filter.push(...m.getFilter());
        });
    };

    /**
     * Use module.
     * @param {BezelModule} module
     */
    const activateModule = module => {
        if (module == null || modules.includes(module)) return;
        modules.add(module);
        module.update(getFilterBefore(module, false));
    };

    /**
     * Remove module from current selection.
     * @param {BezelModule} module
     */
    const deactivateModule = module => {
        console.log('MODULE', module);
        if (module == null || !modules.includes(module)) return;

        module.reset();
        updateSubsequent(module, false);
        modules.del(module);

        console.log('remaining modules', modules.count());
    };

    /**
     * Removes all modules and reset selection.
     */
    const reset = () => {
        [...modules.list].forEach(module => deactivateModule(module));
    };

    /**
     * Removes all active facets on the module.
     * @param {BezelModule} module
     */
    const resetModule = module => {
        module.reset();
        updateSubsequent(module, false);
    };

    /**
     * Removes the selection on a specific facet.
     * @param {BezelModule} module
     * @param {Facet} facet
     */
    const resetFacet = (module, facet) => {
        const filter = getFilterBefore(module, false);
        module.resetFacetSelection(facet, filter);
        updateSubsequent(module, false);
    };

    /**
     * Make facet available to user.
     * @param {BezelModule} module
     * @param {Facet} facet
     * @param {number} position
     * @param {Operation} operation
     */
    const activateFacet = (module, facet, position, operation) => {
        const filter = getFilterBefore(module, false);
        module.activateFacet(facet, position, operation, filter);
    };

    /**
     * Remove facet from the facets currently in use.
     * @param {BezelModule} module
     * @param {Facet} facet
     */
    const deactivateFacet = (module, facet) => {
        const filter = getFilterBefore(module, false);
        module.deactivateFacet(facet, filter);

        updateSubsequent(module, false);
    };

    /**
     * Make a selection on a facet.
     * @param {BezelModule} module
     * @param {Facet} facet
     * @param {TableFacetTarget|RegularFacetTarget} target
     */
    const makeSelection = (module, facet, target) => {
        if (module == null) return;
        const filter = getFilterBefore(module, false);
        module.makeSelection(facet, target, filter);

        updateSubsequent(module, false);
    };

    /**
     * Move a facet within a module.
     * @param module
     * @param container
     * @param targetPos
     */
    const moveInModule = (module, container, targetPos) => {
        const filter = getFilterBefore(module, false);
        module.moveContainer(container, targetPos, filter);
    };

    /**
     * Returns the module for a given name.
     * @param {string} name
     * @returns {BezelModule}
     */
    const getModuleByName = name => availableModules.find(m => m.name === name);

    return {
        addModule,
        onModuleAdd: availableModules.onAdd,
        activateModule,
        onModuleActivate: modules.onAdd,
        deactivateModule,
        onModuleDeactivate: modules.onDel,

        activateFacet,
        deactivateFacet,
        reset,
        resetModule,
        resetFacet,

        makeSelection,
        moveInFacet: moveInModule,
        activatedModulesCount: _ => modules.count(),
        availableModulesCount: _ => availableModules.count(),
        getModuleByName,
    };
};

export default MainController;
