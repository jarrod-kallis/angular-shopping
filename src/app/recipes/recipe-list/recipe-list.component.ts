import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is simply a test',
      'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_981,c_fill,g_auto,h_552,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170517150325-food-general.jpg'
    ),
    new Recipe(
      'Test Recipe',
      'This is simply a test 2',
      'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_981,c_fill,g_auto,h_552,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170517150325-food-general.jpg'
    )
  ];

  constructor() {}

  ngOnInit() {}
}
