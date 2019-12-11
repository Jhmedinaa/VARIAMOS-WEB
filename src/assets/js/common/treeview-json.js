//Modelo de datos Json para el treeview
export function getModelInfo() {

    var json = [
        {
            id: 1,
            name: "",
            icon: "fa-folder",
            children: [
                {
                    id: 2,
                    name: "Domain",
                    icon: "fa-globe-americas",
                    folder: "domain",
                    type: "content",
                    children: [
                        {
                            id: 13,
                            name: "feature",
                            folder: "domain",
                            type: "model",
                        },
                        {
                            id: 4,
                            name: "component",
                            folder: "domain",
                            type: "model",
                        },
                        {
                            id: 5,
                            name: "binding_feature_component",
                            folder: "domain",
                            type: "model",
                        },
                        {
                            id: 6,
                            name: "istar",
                            folder: "domain",
                            type: "model",
                        },
                        {
                            id: 14,
                            name: "requirement",
                            folder: "domain",
                            type: "form",
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Application",
                    icon: "fas fa-mobile-alt",
                    folder: "application",
                    type: "content",
                    children: [
                        {
                            id: 8,
                            name: "Adaptation",
                            icon: "fa-headphones-alt",
                            type: "content",
                            children: [
                                {
                                    id: 16,
                                    name: "requirement",
                                    folder: "domain",
                                    type: "model",
                                }
                            ]
                        },
                        {
                            id: 9,
                            name: "adaptation_state",
                            folder: "application",
                            type: "model",
                        },
                        {
                            id: 10,
                            name: "adaptation_hardware",
                            folder: "application",
                            type: "model",
                        },
                        {
                            id: 11,
                            name: "adaptation_binding_state_hardware",
                            folder: "application",
                            type: "model",
                        },
                        {
                            id: 12,
                            name: "control",
                            folder: "application",
                            type: "model",
                        },
                        {
                            id: 15,
                            name: "requirement",
                            folder: "domain",
                            type: "model",
                        }
                    ]
                }
            ]
        }
    ];

    return json;
}