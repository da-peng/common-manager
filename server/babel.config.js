module.exports = function (api){
    api.cache(true);
  
    const presets = [
        "@babel/env"
    ]
    const plugins = [
        "@babel/plugin-transform-runtime" 
    ];
  
    return {
      presets,
    //   plugins
    };
}