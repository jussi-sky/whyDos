package com.jussi.whydos;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;

public class EpService extends Service {

    @Override
    public IBinder onBind(Intent arg0) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Let it continue running until it is stopped.
        Toast.makeText(this, "Service start", Toast.LENGTH_LONG).show();
        try {
            String flag = intent.getStringExtra("flag");
            Toast.makeText(this, flag, Toast.LENGTH_LONG).show();
        } catch (Exception err) {
            err.printStackTrace();
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "Servive stop", Toast.LENGTH_LONG).show();
    }
}
