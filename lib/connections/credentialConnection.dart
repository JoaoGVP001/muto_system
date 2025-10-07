import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:http/browser_client.dart';

final client = BrowserClient()..withCredentials = true;


Future UserSignUp<int>(String name, String email, String password) async {
  try{
    final url = Uri.parse('http://localhost:3000/user/signup');

    final res = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );

    if (res.statusCode == 200) {
      return 200;
    }
    else{
      return 500;
    }
  }
  catch(e){
    return 500;
  }
  
}

Future AdmSignUp<int>(String name, String email, String password, String cod) async {
  final url = Uri.parse("http://localhost:3000/adm/signup");
  try{
    final res = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name':name, 'email':email, 'password':password, 'cod':cod}) 
    );

    if (res.statusCode == 200) {
      return 200;
    }
    else{
      return 500;
    }
  }
  catch (e){
    return 500;
  }
  
}

Future<int> UserLogin(String name, String email, String password) async {
  try {
    final url = Uri.parse("http://localhost:3000/user/login");

    final res = await client.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );

    return res.statusCode == 200 ? 200 : 500;
  } catch (e) {
    return 500;
  }
}

Future<int> AdmLogin(String name, String email, String password) async {
  try {
    final url = Uri.parse("http://localhost:3000/adm/login");

    final res = await client.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );

    return res.statusCode == 200 ? 200 : 500;
  } catch (e) {
    return 500;
  }
}