import 'package:flutter/material.dart';
import 'package:muto_system/views/credentialView.dart';

void main() => runApp(myApp());

class myApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Credentialview(),
    );
  }
}
